import * as React from 'react';
import type {UseMutationState, UseQueryState} from 'urql';
import {toast} from '@/components/toast';

export function useUrqlError(
  result: UseMutationState | UseQueryState,
  messages: Record<
    string,
    | React.ReactNode
    | UserMessage
    | ((detailedError: DetailedError) => UserMessage)
  > = {}
) {
  const latestMessages = React.useRef(messages);

  React.useEffect(() => {
    latestMessages.current = messages;
  });

  React.useEffect(() => {
    if (!result.error) return;
    if (result.error.networkError) {
      toast({
        subject: 'Network error',
        message:
          'We could not process your request at this time. Try again in a few seconds.',
        variant: 'danger',
      });
    } else if (result.error.graphQLErrors) {
      result.error.graphQLErrors.map((error) => {
        if (error.extensions?.details) {
          error.extensions?.details.map((detailedError: DetailedError) => {
            const userMessage = latestMessages.current[detailedError.type];

            if (userMessage) {
              if (typeof userMessage === 'function') {
                const msg = userMessage(detailedError);

                toast({
                  subject: msg.subject,
                  message: msg.message,
                  variant: msg.variant || 'danger',
                });
              } else if (
                typeof userMessage === 'object' &&
                'message' in userMessage
              ) {
                toast({
                  subject: userMessage.subject,
                  message: userMessage.message,
                  variant: userMessage.variant || 'danger',
                });
              } else {
                toast({
                  subject: 'Error',
                  message: detailedError.message,
                  variant: 'danger',
                });
              }
            } else {
              toast({
                subject: 'Error',
                message: detailedError.message,
                variant: 'danger',
              });
            }
          });
        } else {
          toast({
            subject: 'Error',
            message: error.message,
            variant: 'danger',
          });
        }
      });
    }
  }, [result.error]);
}

type DetailedError = {
  message: string;
  context: {label: string; value: any} & {[key: string]: any};
  path: string[];
  type: string;
};

type UserMessage = {
  subject?: React.ReactNode;
  message: React.ReactNode;
  variant?: 'info' | 'success' | 'danger' | 'warn';
};
