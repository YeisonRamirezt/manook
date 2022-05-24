const Process = {
  _id: 0,
  repId: 0,
  courses: [
    {
      courseId: 0,
      score: 0,
      percentage: 0,
      completed: false,
      modules: [
        {
          moduleId: 0,
          score: 0,
          percentage: 0,
          completed: false,
          sections: [
            {
              sectionId: 0,
              score: 0,
              percentage: 0,
              completed: false,
              quizzes: [
                {
                  quizzId: 0,
                  score: 0,
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Process;