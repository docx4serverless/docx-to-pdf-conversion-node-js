import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DocxWorker } from '@docx-ai/docx4serverless';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, docxAiService: any): Promise<void> {
    const worker = await DocxWorker.createWorker(docxAiService);
    try {
        // import document and export as PDF:
        await worker.loadDocument(context.req.body);
        const pdf = await worker.getPDF();
        context.res = {
            status: 200,
            isRaw: true,
            contentType: "application/pdf",
            body: pdf
        };
    } catch(e) {
        context.res = {
            status: 404,
            isRaw: false,
            contentType: "application/json",
            body: {
                error: e.toString(),
                stack: e.stack
            }
        };
    } finally {
        worker.stop();
    }

    context.done();
};

export default httpTrigger;
