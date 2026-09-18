
pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build Angular') {
            steps {
                echo 'Building Angular frontend...'
                sh 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                echo 'Checking Angular build output...'

                sh '''
                    test -d ../iccc-smart-dashboard/src/main/resources/static/browser
                    test -f ../iccc-smart-dashboard/src/main/resources/static/browser/index.html

                    echo "Build output verified:"
                    du -sh ../iccc-smart-dashboard/src/main/resources/static/browser
                '''
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying frontend to staging server using Ansible...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'windows-staging-winrm',
                        usernameVariable: 'WIN_USER',
                        passwordVariable: 'WIN_PASSWORD'
                    )
                ]) {
                    sh '''
                        ansible-playbook \
                          -i /var/lib/jenkins/ansible/frontend/inventory.ini \
                          /var/lib/jenkins/ansible/frontend/deploy.yml \
                          -e "frontend_src=$WORKSPACE/../iccc-smart-dashboard/src/main/resources/static/browser/" \
                          -e "ansible_user=$WIN_USER" \
                          -e "ansible_password=$WIN_PASSWORD"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend build and staging deployment completed successfully.'
        }

        failure {
            echo 'Frontend build or deployment failed.'
        }
    }
}
