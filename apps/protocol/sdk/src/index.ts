import { abi, checkerAdress, extensionId, rpc, server } from './constants';
import { ethers } from 'ethers';
import { ErrorCode, OMIDError } from './error';
import { ProofResult } from './types';

export default class OMIDInterface {
  readonly appid: string;
  available?: boolean;
  constructor(appid: string) {
    this.appid = appid;
  }

  async isAvailable() {
    try {
      const url = `chrome-extension://${extensionId}/main.js`;
      const { statusText } = await fetch(url);
      if (statusText === 'OK') {
        this.available = true;
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  private async checkisAvailable() {
    const available = await this.isAvailable();
    if (!available) {
      throw new OMIDError(
        ErrorCode.OMID_NOT_INSTALLED,
        'User should have installed the OMID wallet before generate trying to verify provable data.',
      );
    }
  }

  private launch(taskInfo: any) {
    window?.postMessage(
      {
        type: 'AUTH_OMID',
        ...taskInfo,
      },
      '*',
    );
  }

  async connect() {
    await this.checkisAvailable();
    await fetch(`${server}/apps/${this.appid}`)
      .then((res) =>
        this.launch({
          task: 'connect',
          host: res.url,
        }),
      )
      .catch((err) => {
        if (err == ErrorCode.ILLEGAL_APPID)
          throw new OMIDError(
            ErrorCode.ILLEGAL_APPID,
            'Illegal appid, check if it is correct or create appid in developer dashboard.',
          );

        throw new OMIDError(ErrorCode.UNEXPECTED_ERROR, 'Something went wrong.');
      });
  }

  async disconnect() {
    await this.checkisAvailable();
    this.launch({
      task: 'disconnect',
    });
  }

  async fetchWallet(): Promise<string> {
    await this.checkisAvailable();
    this.launch({
      task: 'fetchwallet',
    });
    return new Promise<string>((resolve, reject) => {
      const eventListener = (event: any) => {
        if (event.source === window && event.data && event.data.type === 'SEND_WALLET') {
          window.removeEventListener('message', eventListener);
          return event.data.value as string;
        } else {
          reject(new OMIDError(ErrorCode.UNEXPECTED_ERROR, 'Something went wrong.'));
        }
      };
      window.addEventListener('message', eventListener);
    });
  }

  async proveData(schema: string, data: any): Promise<ProofResult> {
    await this.checkisAvailable();
    this.launch({
      task: 'provedata',
      values: { schema, data },
    });
    return new Promise<ProofResult>((resolve, reject) => {
      const eventListener = (event: any) => {
        if (event.source === window && event.data && event.data.type === 'DATA_PROVEN') {
          window.removeEventListener('message', eventListener);
          return event.data.value as ProofResult;
        } else {
          reject(new OMIDError(ErrorCode.UNEXPECTED_ERROR, 'Something went wrong.'));
        }
      };
      window.addEventListener('message', eventListener);
    });
  }

  async isProofVerified(proofId: string, customRPC?: string) {
    const network = customRPC || rpc;
    const provider = new ethers.JsonRpcProvider(network);

    const contract = new ethers.Contract(checkerAdress, abi as unknown as any, provider);
    try {
      const proof = await fetch(`https://gateway.irys.xyz/${proofId}`);
      if (!proof) {
        return false;
      } else {
        const parsedProof = await proof.json();
        return await contract.verifyProof(proof);
      }
    } catch (error) {
      return false;
    }
  }
}
