export class EntityError extends Error {
  constructor(message: string) {
    super(message);

    // Manter a propriedade do protótipo para a cadeia de protótipos funcionar corretamente
    Object.setPrototypeOf(this, EntityError.prototype);
  }
}
