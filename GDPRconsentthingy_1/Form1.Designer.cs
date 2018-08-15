namespace GDPRconsentthingy_1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.txtGDPRoutline = new System.Windows.Forms.TextBox();
            this.chkConsent = new System.Windows.Forms.CheckBox();
            this.cmdSendEmail = new System.Windows.Forms.Button();
            this.toolTip1 = new System.Windows.Forms.ToolTip(this.components);
            this.SuspendLayout();
            // 
            // txtGDPRoutline
            // 
            this.txtGDPRoutline.Location = new System.Drawing.Point(12, 12);
            this.txtGDPRoutline.Multiline = true;
            this.txtGDPRoutline.Name = "txtGDPRoutline";
            this.txtGDPRoutline.ReadOnly = true;
            this.txtGDPRoutline.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txtGDPRoutline.Size = new System.Drawing.Size(504, 249);
            this.txtGDPRoutline.TabIndex = 0;
            this.txtGDPRoutline.TabStop = false;
            // 
            // chkConsent
            // 
            this.chkConsent.AutoSize = true;
            this.chkConsent.Location = new System.Drawing.Point(12, 267);
            this.chkConsent.Name = "chkConsent";
            this.chkConsent.Size = new System.Drawing.Size(66, 17);
            this.chkConsent.TabIndex = 0;
            this.chkConsent.Text = "I Accept";
            this.chkConsent.UseVisualStyleBackColor = true;
            // 
            // cmdSendEmail
            // 
            this.cmdSendEmail.Location = new System.Drawing.Point(12, 290);
            this.cmdSendEmail.Name = "cmdSendEmail";
            this.cmdSendEmail.Size = new System.Drawing.Size(117, 23);
            this.cmdSendEmail.TabIndex = 3;
            this.cmdSendEmail.Text = "Prepare Email";
            this.cmdSendEmail.UseVisualStyleBackColor = true;
            this.cmdSendEmail.Click += new System.EventHandler(this.trySendEmail);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.ClientSize = new System.Drawing.Size(528, 325);
            this.Controls.Add(this.cmdSendEmail);
            this.Controls.Add(this.chkConsent);
            this.Controls.Add(this.txtGDPRoutline);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.ShowIcon = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "GDPR Consent Prototype";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtGDPRoutline;
        private System.Windows.Forms.CheckBox chkConsent;
        private System.Windows.Forms.Button cmdSendEmail;
        private System.Windows.Forms.ToolTip toolTip1;
    }
}

