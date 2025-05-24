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
    const success = await repo.addScore(+req.params.id, req.body.exemName, +req.body.score);
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

// export const countByNames = (req, res) => {
//     const names = req.query.names;
//     const result = repo.countByNames(names);
//     if(result){
//         res.status(200).send(result);
//     }else {
//         res.status(404).send('something is happened in repositories');
//     }
// }
//
// export const findByMinScore = (req, res) => {
//    const students = repo.findByMinScore(req.params.exem,+req.params.minscore);
//     res.json(students);
// }