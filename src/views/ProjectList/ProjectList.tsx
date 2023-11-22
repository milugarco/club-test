import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'

injectReducer('projectList', reducer)

const ProjectList = () => {
    return (
        <Container className="h-full">
            <ActionBar />
            <ProjectListContent />
        </Container>
    )
}

export default ProjectList
