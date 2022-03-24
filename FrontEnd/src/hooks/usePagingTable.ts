import { useCallback, useEffect, useState } from 'react';

const usePagingTable = <T>(getData: (skip: number, take: number) => Promise<T>, take = 10) => {
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(0);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let mounted = true;
    getData(skip, take)
      ?.then((response: any) => {
        if (!mounted) {
          return;
        }
        if (response) {
          const isExitsCountResponse = response?.count != null;
          setData(isExitsCountResponse ? response?.items : response);
          if (isExitsCountResponse) {
            setIsEndOfList(response?.count <= take || skip + take >= response?.count);
          } else {
            setIsEndOfList(response.length < take ? true : false);
          }
        }
        setIsLoading(false);
      })
      ?.catch(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [skip, take, lastRefresh, getData]);

  const next = useCallback(() => {
    setSkip((s) => s + take);
  }, [take]);

  const previous = useCallback(() => {
    setSkip((s) => s - take);
  }, [take]);

  const fetchData = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  return { skip, setSkip, data, next, previous, fetchData, isLoading, isEndOfList };
};

export default usePagingTable;
