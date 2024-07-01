import axios, { AxiosPromise } from 'axios';

export class ContentDeliveryAPI {
  private readonly environment: string;
  private readonly channelId: string;
  private readonly token?: string;

  constructor(environment: string, channelId: string, token?: string) {
    this.environment = environment;
    this.channelId = channelId;
    this.token = token;
  }

  /**
   * Returns a document for which its UUID matches the provided id or for which the path matches the provided path
   * @param documentId
   */
  public async getV1DocumentById(documentId: string): AxiosPromise {
    let url = `https://${this.environment}.bloomreach.io/delivery/site/v1/channels/${this.channelId}/documents/${documentId}`;
    if (this.token) {
      url += `?preview-token=${this.token}`;
    }

    return await axios.get(url);;
  }

  /**
   * Returns a document for which its UUID matches the provided id or for which the path matches the provided path
   * @param documentId
   */
  public async getV2DocumentById(documentId: string): AxiosPromise {
    let url = `https://${this.environment}.bloomreach.io/delivery/site/v2/documents/${documentId}`;

    return await axios.get(url);
  }

  public async getV2DocumentByQuery() {

  }

}
