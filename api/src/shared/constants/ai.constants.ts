export const AI_PROMPTS = {
  RESUME_GENERATION: (targetJobTitle: string, skills: string[], experience: any[], education: any[]) => `
      You are a professional resume writer. Generate resume content for a candidate applying for the role of "${targetJobTitle}".
      Candidate Profile:
      Skills: ${skills.join(', ')}
      Experience: ${JSON.stringify(experience)}
      Education: ${JSON.stringify(education)}

      Return a JSON object with exactly these fields:
      {
        "summary": "2-3 sentence professional summary",
        "skills_section": "formatted skills as comma-separated string",
        "experience_bullets": ["bullet 1", "bullet 2", "bullet 3"]
      }
      Return ONLY the JSON object, no markdown, no explanation.
    `
};
