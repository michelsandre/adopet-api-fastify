export abstract class IRelation {
  abstract createRelation(
    aId: number | string,
    bId: number | string
  ): Promise<object>;
}
