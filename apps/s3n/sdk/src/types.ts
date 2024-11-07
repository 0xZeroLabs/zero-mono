export enum EventDataType {
  'GENERATE_ZKP_SUCCESS' = 'GENERATE_ZKP_SUCCESS',
  'NOT_MATCH_REQUIREMENTS' = 'NOT_MATCH_REQUIREMENTS',
  'ILLEGAL_WINDOW_CLOSING' = 'ILLEGAL_WINDOW_CLOSING',
  'UNEXPECTED_VERIFY_ERROR' = 'UNEXPECTED_VERIFY_ERROR',
  'INVALID_SCHEMA' = 'INVALID_SCHEMA',
}

export enum Task {}

export interface ProofResult {
  publicFields: any[];
  proofId: string;
  type: string;
  credential: string;
}
