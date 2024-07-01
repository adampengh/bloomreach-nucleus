export const DUMMY_BR_UID_2_FOR_PREVIEW = 'uid%3D0000000000000%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';


/**
 * Get a custom attribute value of a producy by attribute name
 * @param item
 * @param attrName
 */
export const getCustomAttributeByName = (item: Record<string, any>, attrName: string): string | undefined => {
  const customAttr = item?.customAttrs?.find((attr: Record<string, any>) => attr.name === attrName);
  return customAttr?.values?.[0];
}
