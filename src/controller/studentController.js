import * as repo from '../repository/studentRepository.js';

export const addStudent = async (req, res) => {
    const success = await repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = async (req, res) => {
    const student = await repo.findStudent(+req.params.id);
    if (student) {
        delete student.password;
        res.json(student);
    } else {
        res.status(404).send();
    }
}
export const deleteStudent = async (req, res) => {
    const student = await repo.deleteStudent(+req.params.id);
    if (student) {
        delete student.password;
        res.json(student);
    } else {
        res.status(404).send();
    }
}
export const updateStudent = async (req, res) => {
    const student = await repo.updateStudent(+req.params.id, req.body);
    if (student) {
        delete student.scores;
        res.json(student);
    } else {
        res.status(404).send();
    }
}


export const addScore = async (req, res) => {
    console.log(+req.params.id, req.body.examName, +req.body.score);
    const success = await repo.addScore(+req.params.id, req.body.examName, +req.body.score);

    if (success) {
        res.status(201).send('everything is ok');
    } else {
        res.status(404).send('something is happened in repositories');
    }

}

export const findByName = async (req, res) => {
    const students = (await repo.findByName(req.params.name))
        .map(student => {
           delete student.password;
            return student;
        });
    res.json(students);

}

export const countByNames = async (req, res) => {
    const result = (await repo.countByNames(req.query.names));
    res.json(result);
}

export const findByMinScore = async (req, res) => {
   const students = await repo.findByMinScore(req.params.exam, +req.params.minScore);
    res.json(students);
}