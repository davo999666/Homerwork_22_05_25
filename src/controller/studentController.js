import * as repo from '../repository/studentRepository.js';

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    console.log(repo.findStudent(+req.params.id));
    if (student) {
        const tmp = {...student};
        delete tmp.password;
        res.json(tmp);
    } else {
        res.status(404).send();
    }
}

export const updateStudent = (req, res) => {
    const student = repo.updateStudent(+req.params.id, req.body);
    if (student) {
        const tmp = {...student};
        delete tmp.scores;
        res.json(tmp);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const student = repo.deleteStudent(+req.params.id);
    if (student) {
        delete student.password;
        res.json(student);
    } else {
        res.status(404).send();
    }
}

export const addScore = (req, res) => {
    const studentId = req.params.id;
    const { score, examName } = req.body;
    if(repo.addScore(score, examName, studentId)){
        res.status(201).send('everything is ok');
    }else {
        res.status(404).send('something is happened in repositories');
    }

}

export const findByName = (req, res) => {
    const studentName = req.params.name;
    const students = repo.findByName(studentName);
    if(students){
        res.status(200).send(students);
    }else {
        res.status(404).send('something is happened in repositories');
    }

}

export const countByNames = (req, res) => {
    const names = req.query.names;
    const result = repo.countByNames(names);
    if(result){
        res.status(200).send(result);
    }else {
        res.status(404).send('something is happened in repositories');
    }
}

export const findByMinScore = (req, res) => {
   const minScore = req.params.minscore;
   const result = repo.findByMinScore(minScore);
    if(result){
        res.status(200).send(result);
    }else {
        res.status(404).send('something is happened in repositories');
    }
}