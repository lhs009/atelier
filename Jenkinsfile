pipeline {
  environment {
      ecrLoginHelper="docker-credential-ecr-login"
      region="ap-northeast-2"
      ecrUrl="996176317807.dkr.ecr.ap-northeast-2.amazonaws.com"
      repository="atelier-backend"
      dockerFile="Dockerfile.prod" 
      deployHost="192.168.2.205"
      sshUser="ec2-user"
      containerApp="backend"
      containerPortMap="3000:3000"
  }
  agent any
  stages {
    stage("print variables") {
      steps {
        echo "ECR Login Helper: ${ecrLoginHelper}"
        echo "Region: ${region}"
        echo "ECR Repo: ${ecrUrl}/${repository}"
        echo "DeployHost: ${deployHost}"
        echo "Running Build ${BUILD_ID} on ${JENKINS_URL}"
      }
    }
    // Git에서 코드 가져오기
    stage('pull codes from git repository') {
      steps {
        echo 'pulling code from codecommit...'
        script {
          checkout scm
        }
      }
    }
    // Docker image build and push
    stage('build images and push') {
      steps {
        echo 'build image and push...'
        script {
          app = docker.build("${repository}", "-f ${dockerFile} .")
          docker.withRegistry("https://${ecrUrl}", 'ecr:ap-northeast-2:aws-access-key') {
            app.push("${BUILD_ID}")
            app.push("latest")
          }
        }
      }
    }

    // Deploy image and run container
    stage('deploy') {
      steps {
        echo 'deploying the application to production...'
        sshagent(credentials : ["aws-deploy-ssh-key"]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${sshUser}@${deployHost} \
            'aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin ${ecrUrl}/${repository}; \
            docker kill ${containerApp}; \
            docker rm -f ${containerApp}; \
            docker run -d -p ${containerPortMap} \
              --name ${containerApp} --restart=always --network=atelier_network \
              --log-driver=fluentd \
              --log-opt fluentd-address=localhost \
              --log-opt tag=${repository} \
              ${ecrUrl}/${repository}:${BUILD_ID};'
            """
        }
      }
    }
  }
}
