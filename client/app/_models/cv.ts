export class Cv {
    userId: String;
    basics: {
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
    education: [{
        institution: string,
        studyType: string,
        startDate: DateConstructor,
        endDate: DateConstructor
    }];
    skills: [{
        name: string,
        level: number
    }];
    languages: [{
        name: string,
        level: number
    }]

    constructor(basics: any, work: any, education: any, skills: any, languages: any) {
        this.basics = basics;
        this.work = work;
        this.education = education;
        this.skills = skills;
        this.languages = languages;
    }
}