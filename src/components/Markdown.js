import React,{useState} from "react";
import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const initialMarkdown=`# My Awesome Markdown Previewer!

## An Exciting Sub-Heading
### Explore Some Neat Features:

Here's an example of code: \`<span></span>\`, nestled between backticks.

\`\`\`js
// Multi-line code example:

function demoCode(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
    return codeBlock;
  }
}
\`\`\`

You can emphasize text with **bold** or _italic_ styles.
Or combine both for ***emphasis overload***.
Don't forget about ~~strikethrough~~ text effects.

Links are also great: [Visit our website](https://www.example.com)!
> And block quotes provide a polished look.

Tables can be interesting too:

Header 1 | Header 2 | Header 3
------------ | ------------- | -------------
Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3
Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3

- And then we have lists.
  - Some are bulleted.
     - With various levels of indentation.
        - Just like this.

1. Numbered lists are also available.
1. Use only 1s for numbering.
1. Last but not least, let's include an image:

![Example Image](${'/android-chrome-512x512.png'})`;

function Markdown(){
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    const handleChange=function(event){
        setMarkdown(event.target.value);
        };

    const handleClick=function(){
        setExpanded(!expanded);
        const textarea = document.getElementById('editor');
        if (!expanded)
        textarea.style.height = textarea.scrollHeight + 'px'; 
        else
        textarea.style.height = '2em'; 
        };

      const [markdown, setMarkdown] = useState(initialMarkdown);
      const markedMarkdown = marked.parse(markdown);
      const [expanded, setExpanded] = useState(false);
         
return(
    <header className="markdown-header">
        <div className='markdown-container'> 
            <div className="markdown-editor">
              <div className="markdown-editor-toolbar">
                <h4 className="markdown-editor-title">Markdown Editor</h4>
                <button onClick={handleClick}>{expanded? 'Shrink':'Expand'}</button>
              </div>
              <textarea id="editor" onChange={handleChange} value={markdown}></textarea>
            </div>
            {expanded?<></>: <div className="markdown-editor">
            <div className="markdown-editor-toolbar">
                <h4 className="markdown-editor-title">Markdown Output</h4>
            </div>
            <div id="preview" className="editor" dangerouslySetInnerHTML={{ __html: markedMarkdown }}></div>
            </div>
            }
        </div>
    </header>);};
export default Markdown;