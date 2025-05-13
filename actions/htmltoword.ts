'use server'
import HTMLtoDOCX from 'html-to-docx';
import puppeteer from "puppeteer";

export async function htmlToWord(html: string){
  try {
      // Process the HTML content to add inline styles before conversion
      // This approach adds styles directly to elements rather than using a style tag
      const processedHtml = html
          // Add styles for headings
          .replace(/<h1/g, '<h1 style="font-size: 20pt; font-weight: bold; margin-bottom: 12pt; color: #333333;"')
          .replace(/<h2/g, '<h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 10pt; color: #333333;"')
          .replace(/<h3/g, '<h3 style="font-size: 14pt; font-weight: bold; margin-bottom: 8pt; color: #333333;"')
          // Add styles for paragraphs and lists
          .replace(/<p/g, '<p style="margin-bottom: 10pt; color: #333333;"')
          .replace(/<ul/g, '<ul style="margin: 10pt 0;"')
          .replace(/<ol/g, '<ol style="margin: 10pt 0;"')
          .replace(/<li/g, '<li style="margin-bottom: 5pt;"')
          // Add styles for tables
          .replace(/<table/g, '<table style="width: 100%; margin: 12pt 0; border-collapse: collapse;"')
          .replace(/<th/g, '<th style="background-color: #f2f2f2; font-weight: bold; border: 1px solid #d1d1d1; padding: 8pt;"')
          .replace(/<td/g, '<td style="border: 1px solid #d1d1d1; padding: 8pt;"')
          // Add styles for blockquotes and code
          .replace(/<blockquote/g, '<blockquote style="margin-left: 20pt; padding-left: 10pt; border-left: 4px solid #cccccc; font-style: italic; color: #666666;"')
          .replace(/<code/g, '<code style="font-family: \'Courier New\', Courier, monospace;"')
          .replace(/<pre/g, '<pre style="background-color: #f5f5f5; padding: 10pt; font-family: \'Courier New\', Courier, monospace;"')
          // Add styles for links and horizontal rules
          .replace(/<a/g, '<a style="color: #0066cc; text-decoration: underline;"')
          .replace(/<hr/g, '<hr style="border: none; border-top: 1px solid #cccccc; margin: 15pt 0;"');
      
      // Convert HTML to DOCX buffer
      const buffer = await HTMLtoDOCX(processedHtml, null, {
        title: 'Generated Document',
        margins: {
          top: 1440,         // 1 inch in twips (1/20 point)
          right: 1440,
          bottom: 1440,
          left: 1440,
          header: 720,
          fotter: 720,
          gutter: 0
        },
        font: 'Arial',
        fontSize: 12,
        // Using supported properties only
        table: {
          row: {
            cantSplit: true
          }
        },
        footer: false,
        pageNumber: false,
      });
      
      // Return the buffer
      return buffer;
    } catch (error) {
      console.error('Error converting HTML to DOCX:', error);
      throw error;
    }
}

export async function generatePdf(htmlContent: string) {
  const htmlTemplate = `<!DOCTYPE html>
    <html>
      <head>
        <style>
          @page {
            margin: 1in;
            size: letter;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          h1 { font-size: 20pt; font-weight: bold; margin: 14pt 0 8pt 0; }
          h2 { font-size: 16pt; font-weight: bold; margin: 12pt 0 6pt 0; }
          h3 { font-size: 14pt; font-weight: bold; margin: 10pt 0 5pt 0; }
          p { margin: 0 0 8pt 0; }
          ul, ol { margin: 8pt 0; padding-left: 20pt; }
          li { margin-bottom: 4pt; }
          table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
          th { background-color: #f2f2f2; font-weight: bold; }
          th, td { border: 1px solid #d1d1d1; padding: 6pt; }
          blockquote { 
              margin-left: 15pt; 
              padding-left: 8pt; 
              border-left: 3px solid #cccccc;
              font-style: italic;
              color: #666666;
          }
          code { font-family: 'Courier New', Courier, monospace; }
          pre { 
              background-color: #f5f5f5; 
              padding: 8pt; 
              border-radius: 3pt;
              font-family: 'Courier New', Courier, monospace;
          }
          a { color: #0066cc; text-decoration: underline; }
          hr { border: none; border-top: 1px solid #cccccc; margin: 12pt 0; }
          img { max-width: 100%; }

          /* Class-specific overrides for PDF render */
          .ck-content * {
            color: #333333;
            background: transparent;
          }
        </style>
      </head>
      <body>
        <div class="ck-content">
          ${htmlContent}
        </div>
      </body>
    </html>`;

  try {
      const browser = await puppeteer.launch({
          headless: true,
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
          format: 'Letter',
          printBackground: true,
          margin: {
              top: '1in',
              right: '1in',
              bottom: '1in',
              left: '1in'
          },
          displayHeaderFooter: false,
          preferCSSPageSize: true
      });

      await browser.close();
      return pdfBuffer;
  } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('Failed to generate PDF');
  }
}