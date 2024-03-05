import DefaultPageContainer, {
  PageContainerProps,
} from '@awesome/shared/components/pageContainer';
import RootContainer from './rootContainer';

const PageContainer: React.FC<
  Partial<PageContainerProps> & React.PropsWithChildren
> = ({ children, ...props }) => {
  return (
    <DefaultPageContainer {...props} Container={RootContainer}>
      {children}
    </DefaultPageContainer>
  );
};

export default PageContainer;
