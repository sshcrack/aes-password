import test from "ava";
import { Generator } from "../utils/Generator";
import { Deriver } from "../utils/Deriver";
const HMAC_KEY_SIZE = 32;
const PASSWORD_KEY_SIZE = 32;
const bits = (PASSWORD_KEY_SIZE + HMAC_KEY_SIZE) * 8;
const ROUNDS = 100000;
test("Reliable pbkdf2 generation", async (t) => {
    //Password with 16 chars
    const pass = await Generator.generateSalt(16);
    const salt = await Generator.generateSalt(12);
    const options = {
        password: pass,
        salt: salt,
        rounds: ROUNDS,
        bits
    };
    const derived1 = await Deriver.pbkdf2(options);
    const derived2 = await Deriver.pbkdf2(options);
    t.is(derived1, derived2);
});
test("Derive is reliable", async (t) => {
    //Password with 16 chars
    const pass = await Generator.generateSalt(16);
    const salt = await Generator.generateSalt(12);
    const options = {
        password: pass,
        salt: salt,
        rounds: ROUNDS
    };
    const derived1 = await Deriver.deriveFromPassword(options);
    const derived2 = await Deriver.deriveFromPassword(options);
    t.is(derived1, derived2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVyaXZlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi90ZXN0L0Rlcml2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUE7QUFDdEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUUxQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFN0IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFBO0FBQ3JCLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUU7SUFDM0Msd0JBQXdCO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUU3QyxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFN0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJO0tBQ0wsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM5QyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFOUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQ25DLHdCQUF3QjtJQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTdDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQTtJQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRTFELENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzFCLENBQUMsQ0FBQyxDQUFBIn0=