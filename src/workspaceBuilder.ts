import { Workspace, Person, Container, ElementStyle, Shape, Format } from 'structurizr-typescript';
import { parse } from '@aws-sdk/util-arn-parser';
import { TravelNestArchitecture } from './types';


const build = (doc: TravelNestArchitecture): Workspace => {
    const workspace = new Workspace('TravelNest System Architecture', 'Views over different contexts of the TravelNest system architecture');
    workspace.name = 'TravelNest System Architecture';
    
    const people: { [id: string]: Person } = {};
    const components: { [id: string]: Container } = {};

    const dbStyle = new ElementStyle('Database');
    dbStyle.shape = Shape.Cylinder;
    workspace.views.configuration.styles.addElementStyle(dbStyle);

    const snsStyle = new ElementStyle('SNS');
    snsStyle.shape = Shape.Pipe;
    workspace.views.configuration.styles.addElementStyle(snsStyle);
    
    const sqsStyle = new ElementStyle('SQS');
    sqsStyle.shape = Shape.Pipe;
    workspace.views.configuration.styles.addElementStyle(sqsStyle);

    const s3Style = new ElementStyle('S3');
    s3Style.shape = Shape.Folder;
    workspace.views.configuration.styles.addElementStyle(s3Style);

    const personStyle = new ElementStyle('Person');
    personStyle.shape = Shape.Person;
    workspace.views.configuration.styles.addElementStyle(personStyle);

    doc.people.forEach(person => {
      const personS = workspace.model.addPerson(person.name, person.description);
      if (personS) people[person.name] = personS;
    });
    
    const softwareSystem = workspace.model.addSoftwareSystem('TravelNest Architecture', '');
    if (!softwareSystem) throw Error('Failed to create software system');

    doc.components.forEach(component => {
      const parsedArn = parse(component.arn);
      const container = softwareSystem.addContainer(component.name, component.description, parsedArn.service);
      if (!container) throw Error('Failed to create component');
      if (parsedArn.service === 'rds') {
        container.tags.add('Database');
        container.url = `https://eu-west-1.console.aws.amazon.com/rds/home?region=eu-west-1#database:id=${parsedArn.resource.replace('db:', '')};is-cluster=false`;
      } else if (parsedArn.service === 'sqs') {
        container.tags.add('SQS');
        container.url = `https://eu-west-1.console.aws.amazon.com/sqs/v2/home?region=eu-west-1#/queues/https%3A%2F%2F${encodeURIComponent(component.arn)}`;
      } else if (parsedArn.service === 'sns') {
        container.tags.add('SNS');
        container.url = `https://eu-west-1.console.aws.amazon.com/sns/v3/home?region=eu-west-1#/topic/${component.arn}`;
      } else if (parsedArn.service === 's3') {
        container.tags.add('S3');
        container.url = `https://s3.console.aws.amazon.com/s3/buckets/${parsedArn.resource}`;
      } else if (parsedArn.service === 'elasticbeanstalk') {
        container.url = `https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/application/overview?applicationName=${parsedArn.resource.replace('application/', '')}`;
      }
      workspace.documentation.addSection(container, 'repoUrl', Format.Markdown, 'https://github.com/ChristianEder/structurizr-typescript');
      if (container) components[component.name] = container;
    });
    
    doc.people.forEach(person => {
      person.relationships?.forEach(relationship => {
        const container = components[relationship.to];
        const personS = people[person.name];
        personS.uses(container, relationship.description);
      });
    });
    
    doc.components.forEach(component => {
      component.relationships?.forEach(relationship => {
        const componentTargetS = components[relationship.to];
        const componentSourceS = components[component.name];
        componentSourceS.uses(componentTargetS, relationship.description);
      });
    });

    doc.views.forEach(view => {
      const viewS = workspace.views.createContainerView(softwareSystem, view.name, view.description);
      doc.people.forEach(person => {
        if (person.views.includes(view.name)) {
          viewS.addPerson(people[person.name]);
        }
      });
      doc.components.forEach(component => {
        if (component.views.includes(view.name)) {
          viewS.addContainer(components[component.name]);
        }
      });
      viewS.setAutomaticLayout(true);
    });

    return workspace;
};

export {
    build
}
