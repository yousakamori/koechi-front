import '@testing-library/jest-dom';

// import { render, screen } from "@testing-library/react";
import { render } from '@testing-library/react';

import { Button } from '@/components/ui/button';

// import { Button } from "@/components/ui";

// import { Button } from "@/components/ui";
// import { Button } from "../index";
// import { Button } from "../../components/ui";

describe('Button', () => {
  it('Should render hello text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const text = getByText('Click me');
    expect(text).toBeVisible();
  });

  it('should render a disabled button if loading prop is passed', () => {
    const { getByText } = render(<Button loading={true}>Click me</Button>);
    const text = getByText('Click me');

    expect(text.closest('button')).toBeDisabled();
  });

  it('should render a disabled button if disabled prop is passed', () => {
    const { getByText } = render(<Button disabled={true}>Click me</Button>);
    const text = getByText('Click me');

    expect(text.closest('button')).toBeDisabled();
  });

  test('primary', () => {
    const { container } = render(
      <Button color='primary' size='md'>
        Primary
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary disabled', () => {
    const { container } = render(
      <Button color='primary' size='md' disabled>
        Primary
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary large', () => {
    const { container } = render(
      <Button color='primary' size='lg'>
        Primary
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary', () => {
    const { container } = render(
      <Button color='secondary' size='md'>
        Secondary
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary disabled', () => {
    const { container } = render(
      <Button color='secondary' size='md' disabled>
        Secondary
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
