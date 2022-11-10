import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

const definationsFactory = new GraphQLDefinitionsFactory();

definationsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: true,
  skipResolverArgs: true,
});
