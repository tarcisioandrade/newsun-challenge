import { EntityError } from "../shared/entity-error";

const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export class Email {
  constructor(readonly value: string) {
    if (!this.value.match(EMAIL_REGEXP)) {
      throw new EntityError("E-mail incorreto.");
    }
  }
}
