/**
 * Properties that can be passed to an element
 */
export interface ElementProps {
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Adapts props for accessibility based on the component type
 * @param props The original props object
 * @param elementType The type of element to adapt props for
 * @returns The adapted props with appropriate accessibility attributes
 */
export function adaptPropsForA11y(
  props: ElementProps,
  elementType: string,
): ElementProps {
  const { disabled, ...rest } = props;

  // For non-button elements, use aria-disabled instead of the disabled attribute
  if (
    disabled &&
    elementType !== "button" &&
    elementType !== "input" &&
    elementType !== "select" &&
    elementType !== "textarea"
  ) {
    return {
      "aria-disabled": "true",
      ...rest,
    };
  }

  return props;
}
