import {Student} from "../model/student.js";
import e from "express";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = id => students.get(id);

export const deleteStudent = id => {
    const student = students.get(id);
    if (student) {
        students.delete(id);
        return student;
    }
}

export const updateStudent = (id, data) => {
    const student = students.get(id);
    if (student) {
        Object.assign(student, data);
        return student;
    }
}
export const addScore = (score, examName, studentId) => {
    const student = students.get(studentId);
    console.log(student)
    if (student) {
        students.scores[examName] = score;
        return student
    } else {
        return false;
    }
}

export const findByName = (name) => {
    const results = [];
    for (const student of students.values()) {
        if (student.name === name) {
            results.push(student);
        }
    }
    return results;
}

export const countByNames = (name) => {
    const results = {};
    const arrName = Array.isArray(name) ? name : [name];
    for (const student of students.values()) {
        arrName.forEach((item) => {
            if (student.name === item) {
                if (results[item]) {
                    results[item] += 1;
                } else {
                    results[item] = 1;
                }
            }
        })

    }
    return results;
}
export const findByMinScore = (minscore) => {
    const results = [];
    for (const student of students.values()) {
        if (student.scores) {
            for (const score of student.scores) {
                if (score > minscore) {
                    results.push(student);
                }
            }
        }
    }
    return results

}