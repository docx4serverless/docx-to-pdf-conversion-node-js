# docx-to-pdf-conversion-node-js
Easily convert docx to pdf using Microsoft Azure serverless functions:

```javascript
    const worker = await DocxWorker.createWorker(docxAiService);
    try {
        // import document and export as PDF:
        await worker.loadDocument(context.req.body);
        const pdf = await worker.getPDF();
        ...
    } catch(e) {
        ...
    } finally {
        worker.stop();
    }
```

Make sure you followed the instructions at https://docs.microsoft.com/en-us/azure/javascript/tutorial-vscode-serverless-node-01 and Azure Functions installed correctly.

Then simply open this repository in Visual Studio Code and Press F5 which will start a local debugging session.

You can then convert a document simply by sending the document to the REST-API, e.g.

```
curl -o out.pdf  -X POST --data-binary @"test.docx" -H "content-type: application/octet-stream" http://localhost:7071/api/docxToPdf
```

To remove the "## Invalid DevKey/DevSecret ... ##" watermark get a DevKey/DevSecret for free from https://www.docx4serverless.com and update the `local.settings.json` file:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "DOCX4SERVERLESS_KEY": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    "DOCX4SERVERLESS_SECRET": "XXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```



