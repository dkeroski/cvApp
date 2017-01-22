import { Component, OnInit ,Injectable} from '@angular/core';

import { User, Cv } from '../_models/index';
import { CvService, UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'editCv.component.html',
    styleUrls: ['resume.css']
})


export class editCvComponent implements OnInit {
    currentUser: User;
    cv: Cv;
    basic: {
        firstName: string,
        lastName: string,
        jobPosition: string,
        email: string,
        phone: string,
        summary: string,
    };
    work: [{
        company: string,
        position: string,
        website: string,
        startDate: DateConstructor,
        endDate: DateConstructor,
        summary: string
    }];
    skills: [{
        name: string,
        level: number
    }];
    languages: [{
        name: string,
        level: number
    }];
    education: [{
        institution: string,
        studyType: string,
        startDate: DateConstructor,
        endDate: DateConstructor
    }];

    modelLanguage: {
        name: string,
        level: number
    };
    modelSkill: {
        name: string,
        level: number
    };
    modelExperience: {
        company: string,
        position: string,
        website: string,
        startDate: DateConstructor,
        endDate: DateConstructor,
        summary: string
    };
    modelEducation: {
        institution: string,
        studyType: string,
        startDate: DateConstructor,
        endDate: DateConstructor
    };


    // flags jobPosition
    flagAddJobPosition: boolean;
    flagJobPositon: boolean;
    flagDoneJobButton: boolean;
    flagEditJobButton: boolean;

    // flags email
    flagAddEmail: boolean;
    flagEmail: boolean;
    flagDoneEmailButton: boolean;
    flagEditEmailButton: boolean;

    //flags phone
    flagAddPhone: boolean;
    flagPhone: boolean;
    flagDonePhoneButton: boolean;
    flagEditPhoneButton: boolean;

    // flags about
    flagAddAbout: boolean;
    flagAbout: boolean;
    flagDoneAboutButton: boolean;
    flagEditAboutButton: boolean;

    // flags languages
    flagAddLanguage: boolean;
    flagLanguage: boolean;
    flagDoneLanguageButton: boolean;
    flagEditLanguageButton: boolean;

    // flags skills
    flagAddSkill: boolean;
    flagSkill: boolean;
    flagDoneSkillButton: boolean;
    flagEditSkillButton: boolean;

    // flags experience
    flagAddExperience: boolean;
    flagExperience: boolean;
    flagDoneExperienceButton: boolean;
    flagEditExperienceButton: boolean;

    // flags education
    flagAddEducation: boolean;
    flagEducation: boolean;
    flagDoneEducationButton: boolean;
    flagEditEducationButton: boolean;

    constructor(private userService: UserService, private cvService: CvService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.cv = new Cv({}, [], [], [], []);
        this.basic = {
            firstName: '',
            lastName: '',
            jobPosition: '',
            email: '',
            phone: '',
            summary: '',
        };
        this.work = [{
            company: '',
            position: '',
            website: '',
            startDate: Date,
            endDate: Date,
            summary: ''
        }];
        this.skills = [{
            name: '',
            level: 0
        }];
        this.languages = [{
            name: '',
            level: 0
        }];
        this.education = [{
            institution: '',
            studyType: '',
            startDate: Date,
            endDate: Date
        }];

        this.modelLanguage = {
            name: '',
            level: 0
        };
        this.modelSkill = {
            name: '',
            level: 0
        };
        this.modelExperience = {
            company: '',
            position: '',
            website: '',
            startDate: Date,
            endDate: Date,
            summary: ''
        };
        this.modelEducation = {
            institution: '',
            studyType: '',
            startDate: Date,
            endDate: Date
        };
    }
    ngOnInit() {
        var id = JSON.parse(localStorage.getItem('id_user'));
        this.cvService.getCvForUser(id).subscribe(
            data => {
                if (data != undefined) {
                    this.basic = data.basics;
                    this.work = data.work;
                    this.education = data.education;
                    this.skills = data.skills;
                    this.languages = data.languages;

                    // job position
                    if (data.basics.jobPosition != '') {
                        this.flagAddJobPosition = true;
                        this.flagDoneJobButton = false;
                        this.flagEditJobButton = true;
                    }

                    // email
                    if (data.basics.email != '') {
                        this.flagAddEmail = true;
                        this.flagDoneEmailButton = false;
                        this.flagEditEmailButton = true;
                    }

                    // phone
                    if (data.basics.phone != '') {
                        this.flagAddPhone = true;
                        this.flagDonePhoneButton = false;
                        this.flagEditPhoneButton = true;
                    }

                    // about
                    if (data.basics.summary != '') {
                        this.flagAddAbout = true;
                        this.flagDoneAboutButton = false;
                        this.flagEditAboutButton = true;
                    }

                } else {
                    //flags 

                    // job proposition
                    this.flagAddJobPosition = false;
                    this.flagJobPositon = false;
                    this.flagDoneJobButton = false;
                    this.flagEditJobButton = false;

                    // email
                    this.flagAddEmail = false;
                    this.flagEmail = false;
                    this.flagDoneEmailButton = false;
                    this.flagEditEmailButton = false;

                    // phone
                    this.flagAddPhone = false;
                    this.flagPhone = false;
                    this.flagDonePhoneButton = false;
                    this.flagEditPhoneButton = false;

                    // about
                    this.flagAddAbout = false;
                    this.flagAbout = false;
                    this.flagDoneAboutButton = false;
                    this.flagEditAboutButton = false;

                    // language
                    this.flagAddLanguage = false;
                    this.flagLanguage = false;
                    this.flagDoneLanguageButton = false;
                    this.flagEditLanguageButton = false;

                    // skill
                    this.flagAddSkill = false;
                    this.flagSkill = false;
                    this.flagDoneSkillButton = false;
                    this.flagEditSkillButton = false;

                    // experience
                    this.flagAddExperience = false;
                    this.flagExperience = false;
                    this.flagDoneExperienceButton = false;
                    this.flagEditExperienceButton = false;


                    // education
                    this.flagAddEducation = false;
                    this.flagEducation = false;
                    this.flagDoneEducationButton = false;
                    this.flagEditEducationButton = true;
                }
            },
            error => {
                console.log(error);
            });
    }
    // jobPosition
    addJobPositionShowInputText() {
        this.flagAddJobPosition = true;
        this.flagDoneJobButton = true;
        this.flagEditJobButton = false;
    }
    addJobPosition() {
        if (this.basic.jobPosition == '') {
            this.flagAddJobPosition = false;
            this.flagDoneJobButton = false;
            this.flagEditJobButton = false;
            this.flagJobPositon = true;
        } else {
            this.flagDoneJobButton = false;
            this.flagEditJobButton = true;
        }

    }

    // email
    addEmailShowInputText() {
        this.flagAddEmail = true;
        this.flagDoneEmailButton = true;
        this.flagEditEmailButton = false;
    }
    addEmail() {
        if (this.basic.email == '') {
            this.flagAddEmail = false;
            this.flagDoneEmailButton = false;
            this.flagEditEmailButton = false;
            this.flagEmail = true;
        } else {
            this.flagDoneEmailButton = false;
            this.flagEditEmailButton = true;

        }
    }

    //phone
    addPhoneShowInputText() {
        this.flagAddPhone = true;
        this.flagDonePhoneButton = true;
        this.flagEditPhoneButton = false;
    }
    addPhone() {
        if (this.basic.phone == '') {
            this.flagAddPhone = false;
            this.flagDonePhoneButton = false;
            this.flagEditPhoneButton = false;
            this.flagPhone = true;
        } else {
            this.flagDonePhoneButton = false;
            this.flagEditPhoneButton = true;
        }
    }

    //about
    addAboutShowInputText() {
        this.flagAddAbout = true;
        this.flagDoneAboutButton = true;
        this.flagEditAboutButton = false;
    }
    addAbout() {
        if (this.basic.summary.toString() == '') {
            this.flagAddAbout = false;
            this.flagDoneAboutButton = false;
            this.flagEditAboutButton = false;
            this.flagAbout = true;
        } else {
            this.flagDoneAboutButton = false;
            this.flagEditAboutButton = true;

        }
    }

    deleteAbout(summary: string) {
        this.basic.summary = '';
        this.flagDoneAboutButton = false;
        this.flagEditAboutButton = false;
        this.flagAddAbout = false;
    }

    //language
    addLanguageShowForm() {
        this.flagAddLanguage = true;
        this.flagDoneLanguageButton = true;
        this.flagEditLanguageButton = false;
    }

    addLanguage() {
        this.flagAddLanguage = false;
        this.flagDoneLanguageButton = false;
        this.flagEditLanguageButton = true;
        this.languages.push(this.modelLanguage);
        this.modelLanguage = {
            name: '',
            level: 0
        };
    }

    // skill
    addSkillShowForm() {
        this.flagAddSkill = true;
        this.flagDoneSkillButton = true;
        this.flagEditSkillButton = false;
    }

    addSkill() {
        this.flagAddSkill = false;
        this.flagDoneSkillButton = false;
        this.flagEditSkillButton = true;
        this.skills.push(this.modelSkill);
        this.modelSkill = {
            name: '',
            level: 0
        };;
    }


    // experience
    addExperienceShowForm() {
        this.flagAddExperience = true;
        this.flagDoneExperienceButton = true;
        this.flagEditExperienceButton = false;
    }

    addExperience() {
        this.flagAddExperience = false;
        this.flagDoneExperienceButton = false;
        this.flagEditExperienceButton = true;
        this.work.push(this.modelExperience);
        this.modelExperience = {
            company: '',
            position: '',
            website: '',
            startDate: Date,
            endDate: Date,
            summary: ''
        };
    }


    addEducationShowForm() {
        this.flagAddEducation = true;
        this.flagDoneEducationButton = true;
        this.flagEditEducationButton = false;
    }

    addEducation() {
        this.flagAddEducation = false;
        this.flagDoneEducationButton = false;
        this.flagEditEducationButton = true;
        this.education.push(this.modelEducation);
        this.modelEducation = {
            institution: '',
            studyType: '',
            startDate: Date,
            endDate: Date
        };
    }

    deleteLanguage(index: number) {
        this.languages.splice(index, 1);
    }

    deleteSkill(index: number) {
        this.skills.splice(index, 1);
    }

    deleteExperience(index: number) {
        this.work.splice(index, 1);
    }

    deleteEducation(index: number) {
        this.education.splice(index, 1);
    }

    editExperience(index: number) {
        this.flagDoneExperienceButton = true;
        var neededExperience = {
            company: '',
            position: '',
            website: '',
            startDate: Date,
            endDate: Date,
            summary: ''
        };
        neededExperience.company = this.work[index].company;
        neededExperience.position = this.work[index].position;
        neededExperience.website = this.work[index].website;
        neededExperience.startDate = this.work[index].startDate;
        neededExperience.endDate = this.work[index].endDate;
        neededExperience.summary = this.work[index].summary;
        this.modelExperience = neededExperience;
        this.work.splice(index, 1);
    }


    editEducation(index: number) {
        this.flagDoneEducationButton = true;
        var neededEducation = {
            institution: '',
            studyType: '',
            startDate: Date,
            endDate: Date
        };
        neededEducation.institution = this.education[index].institution;
        neededEducation.studyType = this.education[index].studyType;
        neededEducation.startDate = this.education[index].startDate;
        neededEducation.endDate = this.education[index].endDate;
        this.modelEducation = neededEducation;
        this.education.splice(index, 1);
    }

    saveChanges() {

        this.cv.userId = JSON.parse(localStorage.getItem('id_user'));
        this.cv.basics = this.basic;
        this.cv.languages = this.languages;
        this.cv.skills = this.skills;
        this.cv.work = this.work;
        this.cv.education = this.education;
        console.log(this.cv);
        this.cvService.update(this.cv, this.cv.userId.toString()).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }

    downloadPDF() {

    }
}