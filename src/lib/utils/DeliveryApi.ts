import axios, { AxiosPromise } from 'axios';

export class ContentDeliveryAPI {
  private readonly environment: string;
  private readonly channelId: string;
  private readonly token?: string;
  private readonly serverId?: string;

  constructor(environment: string, channelId: string, token?: string, serverId?: string) {
    this.environment = environment;
    this.channelId = channelId;
    this.token = token;
    this.serverId = serverId;
  }

  /**
   * Returns a document for which its UUID matches the provided id or for which the path matches the provided path
   * @param documentId The can be any of the following elements:
   *    - The uuid of a document: /delivery/site/v1/channels/brxsaas/documents/9a3f1f5c-5302-43c4-9bec-584e810ffa2f
   *    - A same uuid in the format used within the Delivery APIs:
   *      /delivery/site/v1/channels/brxsaas/documents/u9a3f1f5c530243c49bec584e810ffa2f
   *    - The absolute path of the document in the repository:
   *      /delivery/site/v1/channels/brxsaas/documents/content/documents/brxsaas/articles/highlighted
   *    - The relative path to the document for the current channel (only valid if the content is a descendant of
   *      the root content folder of the current channel):
   *      /delivery/site/v1/channels/brxsaas/documents/articles/highlighted
   */
  public async getV1DocumentById(documentId: string): AxiosPromise {
    let url = `https://${this.environment}.bloomreach.io/delivery/site/v1/channels/${this.channelId}/documents/${documentId}`;

    const response = await axios(url, {
      headers: {
        ...(this.serverId && { 'Server-ID': this.serverId }),
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      }
    })

    return response;
  }


}
