type TravelNestRelationship = {
  to: string,
  description: string
};

type TravelNestComponent = {
    name: string,
    arn: string,
    description: string,
    views: Array<string>,
    relationships: Array<TravelNestRelationship>
};

type TravelNestPerson = {
  name: string,
  description: string,
  views: Array<string>,
  relationships: Array<TravelNestRelationship>
};

type TravelNestView = {
  name: string,
  description: string
};

type TravelNestArchitecture = {
  views: Array<TravelNestView>,
  people: Array<TravelNestPerson>,
  components: Array<TravelNestComponent>
};

export {
    TravelNestArchitecture
}
