export interface JwtTokenRepositoryInterface {
  createJwtToken(body: any): any;
  updateJwtToken(filter: any, body: any): any;
  getTokenObject(filter: any): any;
}
