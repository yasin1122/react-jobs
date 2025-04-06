import jobsData from '../../src/jobs.json' assert { type: 'json' }

export const handler = async event => {
  // ?id=3  OR  /jobs/3
  const idFromQuery = event.queryStringParameters?.id
  const idFromPath = event.path.split('/').pop() // "3" in /jobs/3
  const id = idFromQuery || (idFromPath !== 'jobs' ? idFromPath : null)

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
