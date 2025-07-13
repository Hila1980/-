// מחולל דפי עבודה בעברית - גרסה ל-Railway
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// הגדרות בסיסיות
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// עמוד הבית עם טופס
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>יצירת דף עבודה</title>
      <style>
        body {
          font-family: 'David', 'Arial Hebrew', Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          background-color: #f0f2f5;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #1a73e8;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        input, textarea, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          font-family: inherit;
        }
        textarea {
          min-height: 200px;
          direction: rtl;
        }
        button {
          background-color: #1a73e8;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
        }
        button:hover {
          background-color: #0d47a1;
        }
        .example {
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
          font-size: 14px;
          white-space: pre-wrap;
        }
        .instructions {
          background-color: #e8f0fe;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 5px;
          border-right: 4px solid #1a73e8;
        }
        .instructions h3 {
          margin-top: 0;
          color: #1a73e8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎓 מחולל דפי עבודה בעברית</h1>
        
        <div class="instructions">
          <h3>💡 הנחיות שימוש:</h3>
          <ul>
            <li><strong>שאלות פתוחות:</strong> יקבלו שורות למענה</li>
            <li><strong>שאלות רב-ברירה:</strong> יזוהו לפי אפשרויות (א), (ב), (ג), (ד)</li>
            <li><strong>שאלות השלמה:</strong> יזוהו לפי קווים תחתונים _____</li>
            <li><strong>מחסן מילים:</strong> הוסף "מחסן מילים:" ואחריו המילים</li>
          </ul>
        </div>
        
        <form action="/create" method="POST">
          <div class="form-group">
            <label for="title">📝 כותרת הדף:</label>
            <input type="text" id="title" name="title" placeholder="לדוגמה: דף עבודה בכדורסל" required>
          </div>
          
          <div class="form-group">
            <label for="font-size">🔤 גודל גופן:</label>
            <select id="font-size" name="font-size">
              <option value="regular">גופן רגיל (14px)</option>
              <option value="large">גופן גדול (18px) - לתלמידים מתקשים</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="intro">📖 טקסט מבוא (אופציונלי):</label>
            <textarea id="intro" name="intro" placeholder="הכנס כאן טקסט מבוא שיופיע לפני השאלות..."></textarea>
          </div>
          
          <div class="form-group">
            <label for="questions">❓ השאלות:</label>
            <textarea id="questions" name="questions" placeholder="הדבק כאן את השאלות..." required></textarea>
            <div class="example">דוגמאות לשאלות:

השלימו את המשפט בעזרת מחסן המילים:
אֶת _______ הַכַּדּוּרְסַל הִמְצִיא _______.
הַכַּדּוּר יוֹצֵא מֵהַמִּגְרָשׁ – עוֹצְרִים אֶת _______.
מִשְׂחַק כַּדּוּרְסַל נִמְשָׁךְ _______ דַּקּוֹת.
מחסן מילים: מִשְׂחָק | הַשָּׁעוֹן | 40 | גֵ'ימְס נִיסְמִית

מָהוּ חֹק 30 הַשְּׁנִיּוֹת בְּמִשְׂחַק כַּדּוּרְסַל?
(א) חֹק שֶׁאִסּוּרוֹ לָרוּץ בְּלִי כַּדּוּר
(ב) חֹק שֶׁאִסּוּרוֹ לְהַחְזִיק בַּכַּדּוּר יוֹתֵר מִ-30 שְׁנִיּוֹת
(ג) חֹק שֶׁמְּתִיר לִהְיוֹת מִתַּחַת לַסַּל
(ד) חֹק שֶׁאוֹמֵר שֶׁהַמִּשְׂחָק נִמְשָׁךְ 30 שְׁנִיּוֹת

הסבר/י מדוע עוצרים את השעון במהלך משחק הכדורסל.</div>
          </div>
          
          <button type="submit">✨ צור דף עבודה</button>
          <button type="reset">🗑️ נקה טופס</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// עיבוד וייצור דף העבודה
app.post('/create', (req, res) => {
  try {
    const { title, intro, questions, 'font-size': fontSize } = req.body;
    
    // עיבוד הטקסט לשאלות נפרדות
    const processedQuestions = processQuestions(questions);
    
    // יצירת דף העבודה
    const worksheetHTML = generateWorksheet(title, intro, processedQuestions, fontSize);
    
    // שליחת התשובה
    res.send(worksheetHTML);
  } catch (error) {
    console.error('שגיאה:', error);
    res.status(500).send(`
      <h1>אופס! משהו השתבש 😅</h1>
      <p>אנא נסה שוב או בדוק את פורמט השאלות</p>
      <a href="/" style="color: #1a73e8;">חזרה לעמוד הראשי</a>
    `);
  }
});

// פונקציה לעיבוד ופיצול השאלות
function processQuestions(text) {
  if (!text) return [];
  
  // מנקה את הטקסט
  text = text.trim();
  
  // מפצל לפי שורות ריקות כפולות או שאלות ממוספרות
  const questionBlocks = [];
  
  // מחפש תבניות של שאלות
  const lines = text.split('\n');
  let currentBlock = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // בדיקה אם זו התחלה של שאלה חדשה
    const isNewQuestion = (
      (line.match(/^שאלה\s+\d+/i) || line.match(/^\d+\./)) ||
      (i > 0 && lines[i - 1].trim() === '' && line !== '')
    );
    
    if (isNewQuestion && currentBlock.trim()) {
      questionBlocks.push(currentBlock.trim());
      currentBlock = line;
    } else {
      currentBlock += (currentBlock ? '\n' : '') + line;
    }
  }
  
  if (currentBlock.trim()) {
    questionBlocks.push(currentBlock.trim());
  }
  
  // מעבד כל בלוק
  return questionBlocks
    .filter(block => block.length > 0)
    .map((block, index) => processQuestionBlock(block, index + 1));
}

// מעבד כל בלוק לשאלה בעלת סוג ומאפיינים
function processQuestionBlock(block, number) {
  // מסיר מספור אם קיים
  let text = block.replace(/^שאלה\s+\d+\.?|^\d+\./, '').trim();
  
  let wordBank = '';
  
  // בדיקה אם יש מחסן מילים
  if (text.includes('מחסן מילים:')) {
    const parts = text.split(/מחסן מילים:/i);
    text = parts[0].trim();
    if (parts.length > 1) {
      wordBank = parts[1].trim();
    }
  }
  
  // זיהוי סוג השאלה
  let type = 'open';
  let options = [];
  
  // בדיקה לשאלת השלמה
  if (text.includes('_') || /השלימו|השלם|מלא/i.test(text)) {
    type = 'fill-in-blanks';
  }
  // בדיקה לשאלת רב-ברירה
  else if (hasMultipleChoiceOptions(text)) {
    type = 'multiple-choice';
    const extracted = extractMultipleChoiceOptions(text);
    text = extracted.questionText;
    options = extracted.choiceOptions;
  }
  
  return {
    number: number,
    text: text,
    type: type,
    wordBank: wordBank,
    options: options
  };
}

// בודק אם יש אפשרויות בחירה
function hasMultipleChoiceOptions(text) {
  const optionPatterns = [
    /\([א-ת]\)/g,
    /^\s*[א-ת]\)/gm
  ];
  
  let count = 0;
  for (const pattern of optionPatterns) {
    const matches = text.match(pattern);
    if (matches) count += matches.length;
  }
  
  return count >= 2;
}

// חילוץ אפשרויות רב-ברירה
function extractMultipleChoiceOptions(text) {
  const lines = text.split('\n');
  const questionLines = [];
  const optionLines = [];
  let foundOptions = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // בדיקה אם זו שורת אפשרות
    const isOption = trimmed.match(/^\s*\([א-ת]\)/) || 
                    trimmed.match(/^\s*[א-ת]\)/) ||
                    /\([א-ת]\)/.test(trimmed);
    
    if (isOption) {
      foundOptions = true;
      
      // ניקוי השורה מהאות והסוגריים
      let cleaned = trimmed
        .replace(/^\s*\([א-ת]\)\s*/, '')
        .replace(/^\s*[א-ת]\)\s*/, '')
        .replace(/\([א-ת]\)\s*/, '')
        .trim();
      
      if (cleaned) {
        optionLines.push(cleaned);
      }
    } else if (!foundOptions && trimmed) {
      questionLines.push(trimmed);
    }
  }
  
  return {
    questionText: questionLines.join('\n'),
    choiceOptions: optionLines
  };
}

// פונקציה ליצירת דף העבודה
function generateWorksheet(title, intro, questions, fontSize) {
  const fontClass = fontSize === 'large' ? 'font-large' : 'font-regular';
  
  return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title || 'דף עבודה'}</title>
      <style>
        @media print {
          @page { 
            size: A4; 
            margin: 0;
          }
          html, body { 
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          .page {
            margin: 0;
            border: none;
            box-shadow: none;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            box-sizing: border-box;
          }
          .no-print { 
            display: none !important; 
          }
        }
        
        html, body {
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
          font-family: 'David', 'Arial Hebrew', Arial, sans-serif;
        }
        
        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 10mm auto;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          padding: 20mm;
          box-sizing: border-box;
        }
        
        .font-regular {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .font-large {
          font-size: 18px;
          line-height: 1.6;
        }
        
        .header {
          text-align: center;
          margin-bottom: 10mm;
        }
        
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        
        hr {
          border: 0;
          border-top: 1px solid #333;
          margin: 5mm 0;
        }
        
        .intro {
          background-color: #f5f5f5;
          padding: 10px;
          margin-bottom: 10mm;
          border-right: 3px solid #4285f4;
        }
        
        .question {
          margin-bottom: 5mm;
          page-break-inside: avoid;
        }
        
        .question-title {
          font-weight: bold;
        }
        
        .blank-line {
          display: inline-block;
          min-width: 100px;
          height: 1px;
          border-bottom: 1px solid #000;
          margin: 0 5px;
          position: relative;
          top: -3px;
        }
        
        .word-bank {
          background-color: #f5f5f5;
          padding: 10px;
          margin: 5px 0;
          border-right: 3px solid #4285f4;
          display: inline-block;
        }
        
        .options {
          margin-top: 5px;
        }
        
        .option {
          margin-bottom: 5px;
        }
        
        .answer-space {
          margin-top: 5px;
        }
        
        .answer-line {
          height: 1.5em;
          border-bottom: 1px solid #aaa;
          margin: 5px 0;
        }
        
        .buttons {
          text-align: center;
          margin-top: 10mm;
        }
        
        .button {
          background-color: #4285f4;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          margin: 0 5px;
          text-decoration: none;
          display: inline-block;
        }
        
        .button:hover {
          background-color: #3367d6;
        }
      </style>
    </head>
    <body class="${fontClass}">
      <div class="page">
        <div class="header">
          <div class="title">${title || 'דף עבודה'}</div>
        </div>
        
        <hr>
        
        ${intro ? `<div class="intro">${intro}</div>` : ''}
        
        <div class="questions">
          ${questions.map(q => generateQuestionHTML(q)).join('')}
        </div>
        
        <div class="buttons no-print">
          <a href="/" class="button">🏠 עמוד ראשי</a>
          <button onclick="window.print()" class="button">🖨️ הדפס</button>
          <button onclick="downloadPDF()" class="button">📄 הורד PDF</button>
        </div>
      </div>
      
      <script>
        function downloadPDF() {
          document.querySelector('.buttons').style.display = 'none';
          window.print();
          setTimeout(() => {
            document.querySelector('.buttons').style.display = 'block';
          }, 1000);
        }
      </script>
    </body>
    </html>
  `;
}

// פונקציה ליצירת HTML של שאלה
function generateQuestionHTML(question) {
  let html = `
    <div class="question">
      <div class="question-title">שאלה ${question.number}. ${question.text.replace(/_+/g, '<span class="blank-line"></span>')}</div>
  `;
  
  // מחסן מילים
  if (question.wordBank) {
    html += `<div class="word-bank">מחסן מילים: ${formatWordBank(question.wordBank)}</div>`;
  }
  
  // אפשרויות רב-ברירה
  if (question.type === 'multiple-choice' && question.options.length > 0) {
    html += `<div class="options">`;
    const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'];
    
    for (let i = 0; i < question.options.length; i++) {
      html += `
        <div class="option">
          <span class="option-letter">(${letters[i]})</span>
          <span>${question.options[i]}</span>
        </div>
      `;
    }
    
    html += `</div>`;
  }
  
  // שורות למענה (שאלות פתוחות)
  if (question.type === 'open') {
    html += `<div class="answer-space">`;
    for (let i = 0; i < 4; i++) {
      html += `<div class="answer-line"></div>`;
    }
    html += `</div>`;
  }
  
  html += `</div>`;
  return html;
}

// פורמוט מחסן מילים
function formatWordBank(wordBank) {
  if (wordBank.includes('|')) {
    return wordBank.split('|').map(w => w.trim()).join(' | ');
  } else if (wordBank.includes(',')) {
    return wordBank.split(',').map(w => w.trim()).join(' | ');
  }
  return wordBank;
}

// הפעלת השרת
app.listen(port, () => {
  console.log(`🚀 השרת פועל בפורט ${port}`);
  console.log(`📝 מחולל דפי עבודה מוכן לשימוש!`);
});