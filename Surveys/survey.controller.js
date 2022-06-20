const service = require("./survey.service");

async function create(req, res){
    const survey = req.body.data;
    let newSurvey = {
        user_id: survey.user_id,
        survey_name: survey.survey_name,
        survey_text: survey.survey_text,
        survey_answer: survey.survey_answer
    }
    const { survey_id } = await service.surveySave(newSurvey);
    newSurvey.survey_id = survey_id;
    res.status(201).json({data: newSurvey})
}

module.exports = {
    create
}