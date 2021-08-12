/* eslint-disable @typescript-eslint/method-signature-style */
export {};

declare global {
  export interface ObjectConstructor {
    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T extends object>(this: this, o: T): readonly (readonly [keyof T, NonNullable<T[keyof T]>])[];
  }
}
