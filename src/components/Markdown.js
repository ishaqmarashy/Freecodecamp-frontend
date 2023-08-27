import React,{useState} from "react";
import {marked} from 'marked';

const initialMarkdown=`# My Awesome Markdown Previewer!

## An Exciting Sub-Heading
### Explore Some Neat Features:

Here's an example of code: \`<span></span>\`, nestled between backticks.

\`\`\`
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

![Example Image](https://via.placeholder.com/150)
`;


function Markdown(){
    const [markdown, setMarkdown] = useState(initialMarkdown);
    const markedMarkdown = marked(markdown, { breaks: true });
    const handleChange=function(event){
        setMarkdown(event.target.value);
        };
        
return(
    <header className="markdown-header">
        <div className='markdown-container'> 
                    <div className="markdown-editor">
                <div className="markdown-editor-toolbar">
                    <h4 className="markdown-editor-title">Markdown Editor</h4>
                    {/* <button>Expand Preview</button> */}
                </div>
                <textarea id="editor" onChange={handleChange} value={markdown}></textarea>
            </div>

            <div className="markdown-editor">
                <div className="markdown-editor-toolbar">
                    <h4 className="markdown-editor-title">Markdown Output</h4>
                </div>
                <div className="editor"dangerouslySetInnerHTML={{ __html: markedMarkdown }}></div>
            </div>

        </div>
    </header>)}
export default Markdown;