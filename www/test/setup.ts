import '@testing-library/jest-dom/extend-expect';
import serializer, {matchers} from '@dash-ui/jest';

expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

afterEach(() => {
  jest.clearAllMocks();
});
