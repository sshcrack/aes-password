import crypto from "crypto";
export class Generator {
    static async generateSalt(length) {
        if (length <= 0)
            throw new Error(`Failed generating salt: Invalid length supplied: ${length}`);
        let output = '';
        while (output.length < length) {
            output += crypto.randomBytes(3).toString('base64');
            if (output.length > length) {
                output = output.substr(0, length);
            }
        }
        return output;
    }
    static async generateIV() {
        return Promise.resolve(Buffer.from(crypto.randomBytes(16)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi91dGlscy9HZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFBO0FBRTNCLE1BQU0sT0FBTyxTQUFTO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBYztRQUM3QyxJQUFJLE1BQU0sSUFBSSxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDYixvREFBb0QsTUFBTSxFQUFFLENBQzdELENBQUM7UUFFSixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUM3QixNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtnQkFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVO1FBQzVCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRiJ9