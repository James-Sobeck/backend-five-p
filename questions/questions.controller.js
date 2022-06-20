const service = require("./questions.service");

async function create(req, res){
    const question = req.body.data;
    let newQuestion = {
        question_answer_pre: question.question_answer_pre,
        question_answer_post: question.question_answer_post,
        module_id: question.module_id,
        finished_at: question.finished_at
    }
    const { mod_question_id } = await service.questionSave(newQuestion);
    newQuestion.mod_question_id = mod_question_id;
    res.status(201).json({data: newQuestion})
}

module.exports = {
    create
}