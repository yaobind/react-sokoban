export default (category) => (rules, name, description) => (content) => {
    const mapEntity = rules.filter(r => r.type === "mapEntity").reduce((acc, r) => {
        return {
            ...acc,
            ...r.map
        }
    }, {});
    return {
        name,
        description,
        category,
        width: content.split("\n").reduce((acc, l) => acc > l.length ? acc : l.length, 0),
        height: content.split("\n").filter(l => !!l).length,
        rules,
        entities: entitiesFromFileContent(mapEntity)(content)
    }
}

const mapEntityType = (mapEntity, entity) => {
    const type = mapEntity[entity.type] || entity.type;
    if (Array.isArray(type)) {
        return type.map(t => ({
            ...entity,
            type: t
        }));
    }
    return {
        ...entity,
        type
    }
};

const entitiesFromFileContent = mapEntity => (content) => {
    return content
        .split("\n")
        .reduce((acc, line, y) => ([
            ...acc,
            ...( line.split("")
                .map( (c, x) => ({x, y, type: c}) ))
        ]), [])
        .filter(e => e.type !== " ")
        .reduce((acc,e) => {
            const newEntity = mapEntityType(mapEntity, e);
            if (Array.isArray(newEntity)) {
                return [
                    ...acc,
                    ...newEntity
                ]
            }
            return [
                ...acc,
                newEntity
            ];
        }, [])

};
