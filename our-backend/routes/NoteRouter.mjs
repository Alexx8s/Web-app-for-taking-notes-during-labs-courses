import express from 'express';
import {getNotes,
        getNoteById,
        deleteNote,
        createNote,
        updateNote,
        getNotesWithFilterAndPagination,
        getNotesByUserId,
        getTagsByNoteId,
        getNoteByStudentId} from "../Dataaccess/NoteDA.mjs";
let noteRouter = express.Router();

noteRouter.route("/note").post(async (req, res) => {
    const id = req.body.StudentID;
    const title = req.body.Title;
    const content = req.body.Content;
    const course = req.body.CourseID
    const note = await createNote({
        StudentID: id,
        Title: title,
        Content: content,
        CourseID: course,}
    );
    return res.status(201).json(note);
});

noteRouter.route("/notes").get(async (req, res) => {
    return res.json(await getNotes());
});
noteRouter.route("/note/:id").get(async (req, res) => {
    return res.json(await getNoteById(req.params.id));
});
noteRouter.route("/note/:id").delete(async (req, res) => {
    return res.json(await deleteNote(req.params.id));
});
noteRouter.route("/note/:id").put(async (req, res) => {
    let ret = await updateNote(req.params.id, req.body);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
});

noteRouter.route('/note/noteFilter/:id').get( async (req, res) => {
    return res.json(await getNotesWithFilterAndPagination(req.query));
})

//note with student id
noteRouter.route("/note/student/:id").get(async (req, res) => {
    try {
      const notes = await getNoteByStudentId(req.params.id);
      return res.json(notes);
    } catch (error) {
      console.error('Error during getting notes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

noteRouter.route("/note/:id/tags").get(async (req, res) => {
    return res.json(await getTagsByNoteId(req.params.id));
});


export default noteRouter;