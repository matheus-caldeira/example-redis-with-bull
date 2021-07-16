interface IRequest {
  name: string;
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
class ExampleService {
  public async execute({ name }: IRequest): Promise<void> {
    await delay(10000);
  }
}

export default ExampleService;
