import Tag from '../entity/Tag.mjs';

async function getTags() {
    return await Tag.findAll({ include: ["Grades"] });
}

async function getTagById(id) {
    return await Tag.findByPk(id, { include: ["Grades"] });
}

async function deleteTag(id) {
    let tag = await Tag.findByPk(id);
    return await tag.destroy();
}

async function createTag(tag) {
    return await Tag.create(tag);
}

export {
    getTags,
    getTagById,
    deleteTag,
    createTag
};