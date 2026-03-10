import trainingData from './training-courses.json'

export interface CourseCurriculum {
  week: number
  title: string
  description: string
  topics: string[]
}

export interface Testimonial {
  name: string
  organization: string
  quote: string
}

export interface TrainingCourse {
  id: number
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  level: string
  duration: string
  format: string
  price: string
  featured: boolean
  instructor: string
  instructorTitle: string
  instructorBio: string
  nextCohort: string
  enrollmentDeadline: string
  maxParticipants: number
  certificateIncluded: boolean
  cpdPoints: number
  tags: string[]
  highlights: string[]
  learningOutcomes: string[]
  curriculum: CourseCurriculum[]
  whoShouldAttend: string[]
  prerequisites: string[]
  testimonials: Testimonial[]
}

// Get all training courses
export function getAllCourses(): TrainingCourse[] {
  return trainingData.courses as TrainingCourse[]
}

// Get all course slugs for static generation
export function getAllCourseSlugs(): string[] {
  return trainingData.courses.map((course) => course.slug)
}

// Get a single course by slug
export function getCourseBySlug(slug: string): TrainingCourse | undefined {
  return (trainingData.courses as TrainingCourse[]).find((course) => course.slug === slug)
}

// Get featured courses
export function getFeaturedCourses(): TrainingCourse[] {
  return (trainingData.courses as TrainingCourse[]).filter((course) => course.featured)
}

// Get courses by category
export function getCoursesByCategory(category: string): TrainingCourse[] {
  if (category === 'All') {
    return trainingData.courses as TrainingCourse[]
  }
  return (trainingData.courses as TrainingCourse[]).filter((course) => course.category === category)
}

// Get related courses (excluding current course)
export function getRelatedCourses(currentSlug: string, limit: number = 3): TrainingCourse[] {
  return (trainingData.courses as TrainingCourse[])
    .filter((course) => course.slug !== currentSlug)
    .slice(0, limit)
}

// Get all categories
export function getAllCourseCategories(): string[] {
  const categories = new Set(trainingData.courses.map((course) => course.category))
  return ['All', ...Array.from(categories)]
}

// Get courses by level
export function getCoursesByLevel(level: string): TrainingCourse[] {
  return (trainingData.courses as TrainingCourse[]).filter((course) => course.level === level)
}
