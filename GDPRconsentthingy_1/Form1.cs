using System;
using System.Windows.Forms;
using System.Reflection;
using System.IO;
using System.Diagnostics;
using System.Security.Principal;
using System.Security.Cryptography;
using System.Text;
using System.Management;
using Microsoft.Win32;
using System.Linq;
using Microsoft.VisualBasic.FileIO;
using System.Threading;

namespace GDPRconsentthingy_1
{
    public partial class Form1 : Form
    {
        private bool supportsEmailClient = true;
        private struct Email
        {
            public string Subject { get; set; }
            public string ToAddr { get; set; }
            public string Body { get; set; }

            public override string ToString()
            {
                return string.Format("mailto:{0}?subject={1}&body={2}", ToAddr, Subject, Body);
            }
        };

        public Form1()
        {
            InitializeComponent();

            //this.toolTip1.SetToolTip(this.cmdSendEmail, "You must have an email client configured for this to work");
            this.toolTip1.SetToolTip(this.cmdSendEmail, "Prepare the email");

            Assembly asm = Assembly.GetExecutingAssembly();
            Stream stream = asm.GetManifestResourceStream("GDPRconsentthingy_1.GDPR.txt");
            StreamReader sr = new StreamReader(stream);
            this.txtGDPRoutline.Text = sr.ReadToEnd();
            sr.Close();
            stream.Close();

            if (Registry.GetValue(@"HKEY_CURRENT_USER\Software\Classes\mailto", "", "") == null)
                supportsEmailClient = false;

        }

        private string getHash(String str)
        {
            SHA512 s = SHA512.Create();
            s.ComputeHash(Encoding.UTF8.GetBytes(str));

            StringBuilder sb = new StringBuilder();
            for(int i = 0; i < s.Hash.Length; ++i)
                sb.Append(s.Hash[i].ToString("x2"));

            return sb.ToString();
        }
        
        private void trySendEmail(object sender, EventArgs e)
        {
            WindowsIdentity winid = WindowsIdentity.GetCurrent();
            ManagementObjectSearcher searcher;
            ManagementObjectCollection moc;
            char[] c = { '\\' };
            string date = DateTime.Now.ToShortDateString();
            string username = winid.Name.Split(c)[1];
            string cspuuid = "";
            string dskserial = "";
            string dsksig = "";
            string hash = "";

            searcher = new ManagementObjectSearcher("select * from Win32_ComputerSystemProduct");
            moc = searcher.Get();

            //append Win32_ComputerSystemProduct UUID
            //this field is populated by computer manufacturers. Not manditory.
            //Is not always guaranteed to be unique:
            //https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-computersystemproduct
            //https://community.spiceworks.com/topic/1980675-how-to-uniquely-identify-windows-machine
            //this is why we also append disk identifiers to the StringBuilder as well before hashing
            foreach (ManagementObject mobj in moc)
            {   //hopefully there is only one of these...
                cspuuid = mobj.Properties["UUID"].Value.ToString();
            }

            searcher = new ManagementObjectSearcher("select * from Win32_DiskDrive");
            moc = searcher.Get();
            foreach (ManagementObject mobj in moc)
            {
                //always get info from diskdrive with index of 0
                //[debug] To get all properties / qualifiers:
                //sb.Append(mobj.GetText(TextFormat.CimDtd20));
                if ((uint)mobj.Properties["Index"].Value == 0)
                {
                    dskserial = mobj.Properties["SerialNumber"].Value.ToString();
                    dsksig = mobj.Properties["Signature"].Value.ToString();
                    break;
                }
            }

            //txtGDPRoutline.Text = username + cspuuid + dskserial + dsksig; //[debug]
            hash = getHash(username + cspuuid + dskserial + dsksig);

            Email email = new Email();

            if (!this.chkConsent.Checked)
            {
                email.Subject = string.Format("GDPR Consent Details - {0} rejected the consent agreement", username);
                email.Body = string.Format("{0} rejects the consent agreement as of {1}\r\nUnique Identifier:\r\n{2}", username, date, hash);
            }
            else
            {
                email.Subject = string.Format("GDPR Consent Details - {0} consents", username);
                email.Body = string.Format("{0} accepts the consent agreement as of: {1}\r\nUnique Identifier:\r\n{2}\r\n", username, date, hash);
            }

            cmdSendEmail.Enabled = false;
            if (supportsEmailClient)
            {
                Email cpy = email;
                cpy.Body = cpy.Body.Replace(Environment.NewLine, "%0D%0A");
                Process.Start(cpy.ToString());
            }
            else
            {
                string tmppath = Environment.GetEnvironmentVariable("temp");
                string emailfile = tmppath + "\\OpenDLPMail";
                Random rng = new Random((int)DateTimeOffset.Now.ToUnixTimeMilliseconds()); //ehh...
                while(File.Exists(emailfile))
                {
                    emailfile += string.Format("{0}", rng.Next());
                }
                StreamWriter tsw = File.CreateText(emailfile);
                tsw.WriteLine("------------------------------------------------");
                tsw.WriteLine("Please email this message to your administrator.");
                tsw.WriteLine("------------------------------------------------");
                tsw.WriteLine(email.Body);
                tsw.Close();
                Process.Start("Notepad.exe", emailfile);
                Thread.Sleep(1500);
                File.Delete(emailfile);
            }
            cmdSendEmail.Enabled = true;

            Environment.CurrentDirectory = Environment.GetEnvironmentVariable("homepath");
            DirectoryInfo info = new DirectoryInfo(".");
            string path = info.FullName + "\\OpenDLP_GDPR";
            string file = path + "\\gdpr_deny_consent.dat";
            if (!chkConsent.Checked)
            {
                if (!File.Exists(file))
                {
                    info.CreateSubdirectory(path.Split('\\').Last());
                    StreamWriter sw = File.CreateText(file);
                    sw.WriteLine("OpenDLP: Do not scan");
                    sw.WriteLine("Delete this file if you wish to consent to OpenDLP scanning instead");
                    sw.Close();
                }
            }
            else
            {
                if (File.Exists(file))
                {
                    bool doDelete = true;
                    DialogResult r = MessageBox.Show(string.Format("File {0} exists. To confirm your consent, this file must be deleted.\nPlease make sure that this file does not contain important information.\nClick 'OK' to send the file to the recycle bin, or 'Cancel' to cancel this operation.", file),
                        "File Exists",
                        MessageBoxButtons.OKCancel,
                        MessageBoxIcon.Warning);
                    if (r == DialogResult.Cancel)
                    {
                        doDelete = false;
                        MessageBox.Show("The file was not deleted.\nDeleting this file is important to signal the scanner that you do consent.\nPlease try again.",
                            "Information",
                            MessageBoxButtons.OK,
                            MessageBoxIcon.Information);
                    }
                    if (doDelete)
                    {
                        FileSystem.DeleteFile(file, UIOption.AllDialogs, RecycleOption.SendToRecycleBin);
                    }
                }
            }
        }
    }
}
