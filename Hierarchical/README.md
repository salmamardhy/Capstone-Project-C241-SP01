## Pros using Hierarchical Clustering with PCA
1. Easy to implement as there are no special parameters that need to be set
2. Flexible because it can be used on various types of data and can adapt to the desired method
3. The resulting dendrogram is very useful for understanding the data
   
## Cons using Hierarchical Clustering with PCA
1. Sensitive to outliers
2. Time complexity for clustering
3. If we have a large dataset, it can be difficult to determine the appropriate number of clusters through the dendrogram.

## Steps on How to Use Hierarchical Method along with PCA
1. Pick and choose a suitable dataset that has been cleaned
2. Choose feature that you need based on the project
3. Encode the categorical feature
4. Scale the dataset with StandarScaler to prevent feature dominance 
5. Reduce dimensionality using PCA on the dataset
6. Plot the PCA result
7. Pick and choose however many component of PCA that you want
8. Perform hierarchical clustering using the linkage method of your choice (single linkage, complete linkage, average linkage) to yout nerw dataset that has been modified by PCA.
9. Plot the dendrogram to visualize the clustering process and decide the number of clusters. You can determine the optimal number of clusters by cutting the dendrogram at the appropriate level.
11. Create Clusters Based from Dendrogram Cut and add the Cluster Column to the Original Data
12. Plot the result to see the cluster distribution using PCA column and cluster result
13. Apply validation method on the final result  (ex. Silhouette score, Davies-Bouldin, Calinski-Harabasz)
14. Save the result to CSV

## Descriptions for the filenames
1. NR: Normalizer technique to scale the dataset
2. SS: Standar Scaler technique to scale the dataset
3. n7, n6: n_components or number of components for PCA
4. c4, c5: total number of clusters used in the clustering model
