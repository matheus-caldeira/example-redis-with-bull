interface IRequest {
  name: string;
}

class ExampleService {
  public async execute({ name }: IRequest): Promise<void> {
    console.log(name)
  }
}

export default ExampleService;
