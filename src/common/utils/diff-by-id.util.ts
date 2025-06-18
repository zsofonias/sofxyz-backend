export const diffById = <T extends { id?: string }>(
  incoming: T[] = [],
  existing: { id: string }[] = [],
) => {
  if (!incoming.length && !existing.length) {
    return { toCreate: [], toUpdate: [], toDelete: [] };
  }
  const toCreate = incoming.filter((i) => !i.id);
  const toUpdate = incoming.filter((i) => i.id);
  const toDelete =
    (incoming.length &&
      existing.filter((e) => !toUpdate.some((u) => u.id === e.id))) ||
    [];
  return { toCreate, toUpdate, toDelete };
};
