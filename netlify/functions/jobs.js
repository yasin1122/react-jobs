// netlify/functions/jobs.js
import jobsData from '../../src/jobs.json' assert { type: 'json' } // note the path!

export const handler = async event => {
  const { id } = event.queryStringParameters || {}

  if (id) {
    const job = jobsData.jobs.find(j => j.id === id)
    return job
      ? { statusCode: 200, body: JSON.stringify(job) }
      : { statusCode: 404, body: 'Job not found' }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(jobsData.jobs),
    headers: { 'Content-Type': 'application/json' }
  }
}
