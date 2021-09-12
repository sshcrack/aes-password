import crypto from "crypto"

export class Generator {
  public static async generateSalt(length: number) {
    if (length <= 0)
      throw new Error(
        `Failed generating salt: Invalid length supplied: ${length}`
      );

    let output = '';
    while (output.length < length) {
      output += crypto.randomBytes(3).toString('base64');
      if (output.length > length) {
        output = output.substr(0, length);
      }
    }

    return output;
  }

  public static async generateIV() {
    return Promise.resolve(Buffer.from(crypto.randomBytes(16)));
  }
}

