import keys from 'lodash/keys';
import { useContext, useMemo } from 'react';

import { ConfigContext } from '../components/config-provider';

interface UseGetDictType {
  dictKey: string | undefined;
  dict?: Record<string, string>;
}

function useGetDict({ dictKey, dict }: UseGetDictType) {
  const { globalDict } = useContext(ConfigContext);

  const dictData = useMemo(() => {
    if (keys(dict ?? {})?.length) return dict;

    if (dictKey && globalDict?.[dictKey]) return globalDict?.[dictKey];

    return {};
  }, [globalDict, dictKey, dict]);

  return {
    dictData,
  };
}

export default useGetDict;
